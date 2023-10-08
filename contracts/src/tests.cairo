const ONE_POW_18: u256 = 1_000_000_000_000_000_000_u256;

#[cfg(test)]
fn ZERO_ADDRESS() -> ContractAddress {
    contract_address_const::<0>()
}

#[cfg(test)]
fn OWNER() -> ContractAddress {
    contract_address_const::<10>()
}

#[cfg(test)]
fn NOT_OWNER() -> ContractAddress {
    contract_address_const::<14>()
}

#[cfg(test)]
fn RECEIVER() -> ContractAddress {
    contract_address_const::<20>()
}

#[cfg(test)]
fn init_WToken() -> WToken {
    let instance = WToken.constructor(32);
    set_contract_address(OWNER());
    instance
}

#[cfg(test)]
fn init_WToken() -> WToken {
    let initial_curve_coefficient = 1_u256; // Or any other appropriate value.
    let instance = WToken.constructor(initial_curve_coefficient);
    set_contract_address(OWNER());
    instance
}

#[cfg(test)]
mod wtoken_contract_tests {
    use starknet::{get_block_timestamp, contract_address_const};
    use starknet::testing::{set_contract_address};
    use contracts::wtoken::WToken::{WToken, IWTokenDispatcherTrait, IWTokenDispatcher};
    use contracts::usdt::USDT::{USDT, IUSDTDispatcherTrait, IUSDTDispatcher};
    use super::{init_WToken, init_USDT, OWNER, RECEIVER};

    // #[test]
    // #[available_gas(40000000)]
    // fn it_should_set_usdt_contract_address() {
    //     let wtoken_instance = init_WToken();
    //     let usdt_instance = init_USDT();

    //     set_contract_address(OWNER);
    //     wtoken_instance.set_usdt_contract_address(usdt_instance.contract_address);

    //     assert_eq!(
    //         wtoken_instance.usdt_contract_address(),
    //         usdt_instance.contract_address,
    //         "USDT address should be set correctly"
    //     );
    // }

    #[test]
    #[available_gas(40000000)]
    fn it_should_buy_tokens() {
        let wtoken_instance = init_WToken();
        let usdt_instance = init_USDT();
        let usdt_amount = 1000_u256;
        let expected_tokens = usdt_amount * wtoken_instance.curve_coefficient();

        set_contract_address(RECEIVER);
        usdt_instance.approve(wtoken_instance.contract_address, usdt_amount);
        wtoken_instance.buy_tokens(usdt_amount);

        assert_eq!(
            wtoken_instance.balanceOf(RECEIVER),
            expected_tokens,
            "Tokens should be minted correctly"
        );
    }

    // #[test]
    // #[available_gas(40000000)]
    // fn it_should_sell_tokens() {
    //     let wtoken_instance = init_WToken();
    //     let usdt_instance = init_USDT();
    //     let wtoken_amount = 1000_u256;
    //     let expected_usdt = wtoken_amount / wtoken_instance.curve_coefficient();

    //     set_contract_address(RECEIVER);
    //     wtoken_instance.mint(RECEIVER, wtoken_amount);
    //     wtoken_instance.sell_tokens(wtoken_amount);

    //     assert_eq!(
    //         usdt_instance.balanceOf(RECEIVER), expected_usdt, "USDT should be returned correctly"
    //     );
    // }
}
