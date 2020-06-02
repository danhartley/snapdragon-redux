import React from 'react';
import classNames from 'classNames';

import { useField } from 'formik';

import styled from '@emotion/styled';

export const SnapRow = props => (
  <div className={'rows ' + props.className}>
    {props.children}
  </div>
);

// export const SnapInput = props => {
//   return (
//     <div className="input-field col">
//       <input id={props.id} type="text" placeholder={props.placeholder} spellCheck="false" value={props.value} onChange={props.onChange} />            
//       <label className="active capitalise" htmlFor={props.id}>{props.label}</label>
//     </div>);
// }

export const SnapButton = props => {
  let btnClass = classNames({ [props.className]: true, btn: true, [props.nonsense]: props.nonsense });
  return (  
  <Button type={props.type} disabled={props.disabled} className={btnClass} color="primary" variant="contained" {...props}>{props.value}</Button>
)};

export const SnapLink = props => (
  <div className={'underline-link ' + props.className}>{props.value}</div>
);

export const SnapIconImage = props => {
  let imgClass = classNames({ [props.className]: true, });
  return (
    <img className={imgClass} width="48px" height="48px" src={props.src} alt={props.name}  />
  )
};

// Styled components ....
const StyledSelect = styled.select`
  /** ... * /
`;

const StyledErrorMessage = styled.div`
  /** ... * /
`;

const StyledLabel = styled.label`
//  color: red;
`;

export const SnapInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const SnapCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const SnapSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};