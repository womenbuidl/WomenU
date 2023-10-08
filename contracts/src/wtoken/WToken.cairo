use starknet::ContractAddress;
use contracts::erc20::ERC20::{IERC20DispatcherTrait, IERC20Dispatcher};
use contracts::usdt::USDT::{IUSDTDispatcherTrait, IUSDTDispatcher};

#[starknet::interface]
trait IWToken<TContractState> {
    fn buy_tokens(ref self: TContractState, usdt_amount: u256) -> bool;
    fn sell_tokens(ref self: TContractState, wtoken_amount: u256) -> bool;
    fn set_usdt_contract_address(ref self: TContractState, address: ContractAddress) -> bool;
}

#[starknet::contract]
mod WToken {
    use starknet::{
        ContractAddress, get_caller_address, get_block_timestamp, get_contract_address,
        contract_address_const
    };
    use super::{IERC20DispatcherTrait, IERC20Dispatcher, IUSDTDispatcherTrait, IUSDTDispatcher};


    #[storage]
    struct Storage {
        curve_coefficient: u256,
        reserve_balance: u256,
        usdt_contract_address: ContractAddress,
        owner: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[constructor]
    fn constructor(ref self: ContractState, initial_curve_coefficient: u256) {
        self.curve_coefficient.write(initial_curve_coefficient);
        self.reserve_balance.write(0);
        self.owner.write(get_caller_address());
    }

    #[external(v0)]
    impl WToken of super::IWToken<ContractState> {
        fn set_usdt_contract_address(ref self: ContractState, address: ContractAddress) -> bool {
            assert(
                get_caller_address() == self.owner.read(), "Only the owner can set the USDT address"
            );
            self.usdt_contract_address.write(address);
            true
        }

        fn buy_tokens(ref self: ContractState, usdt_amount: u256) -> bool {
            let erc20_dispatcher = IERC20Dispatcher {
                contract_address: self.usdt_contract_address.read()
            };
            let current_supply = erc20_dispatcher.totalSupply();
            let tokens_to_mint = self.curve_coefficient.read() * usdt_amount;

            // Update reserve balance.
            self.reserve_balance.write(self.reserve_balance.read() + usdt_amount);

            // Transfer USDT from the caller to this contract.
            let usdt_dispatcher = IUSDTDispatcher {
                contract_address: self.usdt_contract_address.read()
            };
            let allowance = usdt_dispatcher.allowance(get_caller_address(), get_contract_address());
            assert(allowance >= usdt_amount, "USDT allowance is insufficient");

            // Mint new tokens to the caller.
            erc20_dispatcher.mint(get_caller_address(), tokens_to_mint);

            true
        }

        fn sell_tokens(ref self: ContractState, wtoken_amount: u256) -> bool {
            let erc20_dispatcher = IERC20Dispatcher {
                contract_address: self.usdt_contract_address.read()
            };
            let current_supply = erc20_dispatcher.totalSupply();
            let usdt_to_return = wtoken_amount / self.curve_coefficient.read();

            // Ensure there's enough USDT in reserve.
            assert(self.reserve_balance.read() >= usdt_to_return, "Not enough USDT in reserve");

            let caller_wtoken_balance = erc20_dispatcher.balanceOf(get_caller_address());
            assert(caller_wtoken_balance >= wtoken_amount, "Insufficient WTokens to sell");

            // Update reserve balance.
            self.reserve_balance.write(self.reserve_balance.read() - usdt_to_return);

            // Burn tokens from the caller.
            erc20_dispatcher.transfer(contract_address_const::<0>(), wtoken_amount);

            // Transfer USDT to the caller.
            let usdt_dispatcher = IUSDTDispatcher {
                contract_address: self.usdt_contract_address.read()
            };
            usdt_dispatcher.transfer(get_caller_address(), usdt_to_return);

            true
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {}
}
