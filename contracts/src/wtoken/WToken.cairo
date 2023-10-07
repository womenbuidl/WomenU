use contracts::erc20::ERC20::{IERC20DispatcherTrait, IERC20Dispatcher};
use starknet::ContractAddress;

#[starknet::interface]
trait IWToken<TContractState> {
    fn buy_tokens(ref self: TContractState, usdt_amount: u256) -> bool;
    fn sell_tokens(ref self: TContractState, wtoken_amount: u256) -> bool;
}

#[starknet::contract]
mod WToken {
    #[storage]
    struct Storage {
        curve_coefficient: u256,
        reserve_balance: u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[constructor]
    fn constructor(ref self: ContractState, initial_curve_coefficient: u256) {
        self.curve_coefficient.write(initial_curve_coefficient);
        self.reserve_balance.write(0);
    }

    #[external(v0)]
    impl WToken of super::IWToken<ContractState> {
        fn buy_tokens(ref self: ContractState, usdt_amount: u256) -> bool {
            let current_supply = IERC20Dispatcher.totalSupply();
            let tokens_to_mint = self.curve_coefficient.read() * usdt_amount;

            // Update reserve balance.
            self.reserve_balance.write(self.reserve_balance.read() + usdt_amount);

            // Mint new tokens to the caller.
            IERC20Dispatcher.mint(get_caller_address(), tokens_to_mint);

            true
        }

        fn sell_tokens(ref self: ContractState, wtoken_amount: u256) -> bool {
            let current_supply = IERC20Dispatcher.totalSupply();
            let usdt_to_return = wtoken_amount / self.curve_coefficient.read();

            // Ensure there's enough USDT in reserve.
            assert
            self.reserve_balance.read() >= usdt_to_return;

            // Update reserve balance.
            self.reserve_balance.write(self.reserve_balance.read() - usdt_to_return);

            // Burn tokens from the caller.
            IERC20Dispatcher.transfer(contract_address_const::<0>(), wtoken_amount);

            // TODO: Transfer USDT to the caller.

            true
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {}
}
