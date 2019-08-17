import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  flex: 2;
  padding: 5px;
`;

const FormItem = ({
  name,
  label,
  type = "text",
  value,
  readOnly = false,
  onChange
}) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        value={value}
        readonly={readOnly}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default FormItem;
