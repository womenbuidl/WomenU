use contracts::erc20::ERC20::{IERC20DispatcherTrait, IERC20Dispatcher};
use starknet::ContractAddress;


#[starknet::interface]
trait IWToken<TContractState> {}

#[starknet::contract]
mod WToken {
    #[storage]
    struct Storage {}

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[external(v0)]
    impl WToken of super::IWToken<ContractState> {}

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {}
}