import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import type { StyleObject } from "styletron-react";
import type { ReactNode } from "react";

// typings
type Override = { style?: StyleObject };
type SelectOverrides = { Item?: Override };
type Option = { readonly label?: ReactNode };
type Options = ReadonlyArray<Option>;
type Props = { option: Option };

interface SelectProps {
  overrides?: SelectOverrides;
  options: Options;
  placeholder?: string;
  onChange?: (props: Props) => void;
}

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

/**
 * Component for letting users select option from list of options
 *
 * @component
 * @example
 * const options = []
 * const placeholder = "user";
 * const onChangeHandler = (props: Props) => console.log(`Selected ${props.option.label}`);
 *
 * return (
 *  <Select options={options} placeholder={placeholder} onChange={onChangeHandler} />
 * )
 *
 * @param { SelectOverrides } overrides CSS overrides
 * @param { Options } options Options that a user can select
 * @param { string | undefined } placeholder Default option
 * @param { (props: Props) => void } onChange function to fire when option changes
 */
export const Select: FC<Partial<SelectProps>> = ({
  placeholder,
}: Partial<SelectProps>): ReactElement => {
  const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);
  const onWindowClick = (e: MouseEvent) => {
    let weAreInsideDropdown = e
      .composedPath()
      .includes(document.querySelector("#vaxx-select")!);

    if (!weAreInsideDropdown) {
      setDropdownIsActive(false);
      window.removeEventListener("click", onWindowClick);
    }
  };

  const toggleDropdown = () => {
    if (!dropdownIsActive) {
      setDropdownIsActive(true);
      window.addEventListener("click", onWindowClick);
    } else {
      setDropdownIsActive(false);
      window.removeEventListener("click", onWindowClick);
    }
  };

  return (
    <Container>
      <Button id={"vaxx-select"} onClick={toggleDropdown}>
        {placeholder}
      </Button>
      {dropdownIsActive && <p>test</p>}
    </Container>
  );
};
