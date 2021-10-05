import React, { FC, ReactElement, useState } from "react";
import { styled } from "styletron-react";
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
const Container = styled("div", {
  display: "block",
  flexDirection: "column",
});

const InputContainer = styled("div", {
  paddingRight: "0px",
  paddingLeft: "10px",
  paddingBottom: "10px",
  paddingTop: "10px",
  flexWrap: "nowrap",
  alignItems: "center",
  flexBasis: "0%",
  flexShrink: 1,
  flexGrow: 1,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  boxSizing: "border-box",
});

const Button = styled("div", {
  backgroundColor: "rgb(238, 238, 238)",
  width: "100%",
  minWidth: "144px",
  boxSizing: "border-box",
  display: "flex",
  lineHeight: "24px",
  cursor: "pointer",
});

const Placeholder = styled("p", {
  overflowwrap: "normal",
  whitespace: "nowrap",
  textoverflow: "ellipsis",
  maxwidth: "100%",
  height: "100%",
  marginleft: "2px",
  overflow: "hidden",
  boxsizing: "border-box",
  lineheight: "24px",
  display: "block",
});

const ArrowContainer = styled("div", {
  alignSelf: "stretch",
  flexShrink: 0,
  alignItems: "center",
  display: "flex",
  position: "relative",
  boxSizing: "border-box",
  color: "rgb(0, 0, 0)",
  cursor: "pointer",
  paddingRight: "12px",
});

const Arrow = styled("svg", {
  width: "16px",
  height: "16px",
  fill: "currentcolor",
  display: "inline-block",
  color: "rgb(0, 0, 0)",
  overflow: "hidden",
  fontSize: "16px",
});

const ItemContainer = styled("ul", {
  maxHeight: "900px",
  overflow: "auto",
  paddingBottom: "8px",
  paddingTop: "8px",
  paddingLeft: "0px",
  paddingRight: "0px",
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow: "rgb(0 0 0 / 16%) 0px 4px 16px",
  margin: "0px",
  marginTop: "-2px",
  borderBottomRightRadius: "0px",
  borderBottomleftRadius: "0px",
  borderTopRightRadius: "0px",
  borderTopLeftRadius: "0px",
  position: "relative",
});

const Item = styled("li", {
  transitionProperty: "color, background-color",
  fontSize: "14px",
  paddingBottom: "8px",
  paddingTop: "8px",
  display: "block",
  backgroundColor: "transparent",
  paddingRight: "16px",
  paddingLeft: "16px",
  lineHeight: "20px",
  marginBottom: "0px",
  transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.4, 1)",
  transitionDuration: "200ms",
  cursor: "pointer",
  position: "relative",

  ":hover": {
    backgroundColor: "rgb(246, 246, 246)",
  },
});

const DropdownContainer = styled("div", {
  position: "absolute",
  backgroundColor: "rgb(238, 238, 238)",
  display: "block",
  zIndex: 10,
  marginBottom: 0,
  opacity: 1,
});

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
 *  <Select options={options} valueKey={"id"} placeholder={placeholder} onChange={onChangeHandler} />
 * )
 *
 * @param { SelectOverrides } overrides CSS overrides
 * @param { Options } options Options that a user can select
 * @param { string } valuekey key for unique identifier on option
 * @param { Option } value currently selected option
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
        <DropdownContainer style={{ width: getButtonWidth() }}>
          <ItemContainer>
            {options.map((option: Option, index: number) => (
              <Item
                onClick={() => selectItem(option.label)}
                key={index}
                style={{
                  fontWeight:
                    option[valueKey] === value[valueKey] ? "bold" : "normal",
                  color:
                    option[valueKey] === value[valueKey]
                      ? "rgb(0, 0, 0)"
                      : "rgb(84, 84, 84)",
                }}
              >
                {option.label}
              </Item>
            ))}
          </ItemContainer>
        </DropdownContainer>
      )}
    </Container>
  );
};
