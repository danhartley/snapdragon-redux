import React from 'react';
import Downshift from 'downshift';
import { useCombobox } from 'downshift';
import { useStyles, comboboxStyles } from 'admin/screens/video/utils';

// https://www.downshift-js.com/use-combobox

export const SnapPicker = props => (
    <Downshift
      onChange={selection => {
          props.onChange(selection);
      }}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <section>
          <label className="margin-right" {...getLabelProps()}>{props.label}</label>
          <div
            style={{display: 'inline-block'}}
            {...getRootProps({}, {suppressRefError: true})}
          >
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? props.items
                  .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
              : null}
          </ul>
        </section>
      )}
    </Downshift>
);
  