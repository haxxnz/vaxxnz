import React, { FC, ReactElement, useState } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";
import type { StyleObject } from "styletron-react";

// typings
type Override = { style?: StyleObject; node: ReactNode };
type SelectOverrides = { InputContainer?: Override };
type Option = any;
type Options = ReadonlyArray<Option>;
type Props = { option: Option };

interface SelectProps {
  overrides?: SelectOverrides;
  options: Options;
  placeholder?: string;
  value: Option;
  valueKey: string;
  onChange: (props: Props) => void;
}

// Styled components
const Container = styled.div`
  display: block;
  // z-index: 10 !important;
  flex-direction: column;
`;

const InputContainer = styled.div`
  // z-index: 1;
  padding-right: 0px;
  padding-left: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  flex-wrap: nowrap;
  align-items: center;
  flex-basis: 0%;
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Button = styled.div`
  background-color: rgb(238, 238, 238);
  width: 100%;
  min-width: 144px;
  box-sizing: border-box;
  display: flex;
  line-height: 24px;
  cursor: pointer;
`;

const Placeholder = styled.p`
  overflowwrap: normal;
  whitespace: nowrap;
  textoverflow: ellipsis;
  maxwidth: 100%;
  height: 100%;
  marginleft: 2px;
  overflow: hidden;
  boxsizing: border-box;
  lineheight: 24px;
  display: block;
`;

const ArrowContainer = styled.div`
  // z-index: 2 !important;
  align-self: stretch;
  flex-shrink: 0;
  align-items: center;
  display: flex;
  position: relative;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  padding-right: 12px;
`;

const Arrow = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentcolor;
  display: inline-block;
  color: rgb(0, 0, 0);
  overflow: hidden;
  font-size: 16px;
`;

const ItemContainer = styled.ul`
  max-height: 900px;
  overflow: auto;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 0px;
  padding-right: 0px;
  // z-index: 10 !important;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 16px;
  margin: 0px;
  margin-top: -2px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  position: relative;
`;

const Item = styled.li`
  transition-property: color, background-color;
  font-size: 14px;
  padding-bottom: 8px;
  // z-index: 10 !important;
  padding-top: 8px;
  display: block;
  background-color: transparent;
  padding-right: 16px;
  padding-left: 16px;
  line-height: 20px;
  margin-bottom: 0px;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);
  transition-duration: 200ms;
  cursor: pointer;
  position: relative;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

  :hover {
    background-color: rgb(246, 246, 246);
  }
`;

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
export const Select: FC<SelectProps> = ({
  placeholder,
  options,
  value,
  valueKey,
  onChange,
  overrides,
}: SelectProps): ReactElement => {
  const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);
  const [dropdownId] = useState<string>(
    `vaxx-select-${new Date().getMilliseconds()}`
  );

  const onWindowClick = (e: MouseEvent) => {
    let weAreInsideDropdown = e
      .composedPath()
      .includes(document.querySelector(`#${dropdownId}`)!);

    if (!weAreInsideDropdown) {
      setDropdownIsActive(false);
      window.removeEventListener("click", onWindowClick);
    }
  };

  const getButtonWidth = (): string => {
    const button: any = document.querySelector(`#${dropdownId}`);

    return button.offsetWidth;
  };

  const selectItem = (item: string) => {
    const selected_option =
      options.find((option) => option.label === item) || ({} as Option);
    onChange({ option: selected_option });
  };

  const toggleDropdown = () => {
    if (!dropdownIsActive) {
      window.addEventListener("click", onWindowClick);
    } else {
      window.removeEventListener("click", onWindowClick);
    }

    setDropdownIsActive((state) => !state);
  };

  return (
    <Container>
      <Button
        id={dropdownId}
        onClick={toggleDropdown}
        style={{
          border: dropdownIsActive
            ? "2px solid black"
            : "2px solid transparent",
        }}
      >
        <InputContainer>
          <Placeholder>{value?.label || placeholder}</Placeholder>

          {overrides?.InputContainer && overrides?.InputContainer.node}
        </InputContainer>

        <ArrowContainer>
          <Arrow viewBox="0 0 24 24">
            <path d="M12.7071 15.2929L17.1464 10.8536C17.4614 10.5386 17.2383 10 16.7929 10L7.20711 10C6.76165 10 6.53857 10.5386 6.85355 10.8536L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929Z"></path>
          </Arrow>
        </ArrowContainer>
      </Button>

      {dropdownIsActive && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgb(238, 238, 238)",
            display: "block",
            zIndex: 10,
            marginBottom: 0,
            width: getButtonWidth(),
            opacity: 1,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "block",
              backgroundColor: "rgb(238, 238, 238)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "block",
                zIndex: 10,
              }}
            >
              <ItemContainer>
                {options.map((option: Option, index: number) => (
                  <Item
                    onClick={() => selectItem(option.label)}
                    key={index}
                    style={{
                      fontWeight:
                        option[valueKey] == value[valueKey] ? "bold" : "normal",
                      color:
                        option[valueKey] == value[valueKey]
                          ? "rgb(0, 0, 0)"
                          : "rgb(84, 84, 84)",
                    }}
                  >
                    {option.label}
                  </Item>
                ))}
              </ItemContainer>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
