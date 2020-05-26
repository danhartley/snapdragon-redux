import React from 'react';
import { useCombobox } from 'downshift';
import { useStyles, comboboxStyles } from 'admin/screens/video/utils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButton, Input, FormLabel, List, ListItem, ListItemText} from '@material-ui/core';

const itemsAsObjects = [
  {
    id: 1,
    title: 'Great video!',
    presenter: 'dan'
  }
  ,{
    id: 2,
    title: 'Rubbish!',
    presenter: 'dan'
  }
  ,{
    id: 3,
    title: 'Rubbish and some!',
    presenter: 'dan'
  }
];

export const VideoPicker = () => {
  
  function DropdownCombobox() {
    const classes = useStyles()
    const itemToString = item => (item ? item.title : '')
    const [inputItems, setInputItems] = React.useState(itemsAsObjects)
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      getInputProps,
      getComboboxProps,
    } = useCombobox({
      items: inputItems,
      itemToString,
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          itemsAsObjects.filter(item =>
            itemToString(item)
              .toLowerCase()
              .startsWith(inputValue.toLowerCase()),
          ),
        )
      },
    })
    return (
      <div>
        <FormLabel {...getLabelProps()}>Find video by title</FormLabel>
        <div style={comboboxStyles} {...getComboboxProps()}>
          <Input
            placeholder="Start typing title"
            {...getInputProps({ refKey: 'inputRef' })}
          />
          <IconButton
            color="secondary"
            className={classes.button}
            {...getToggleButtonProps()}
          >
            <ExpandMoreIcon className={classes.rightIcon} />
          </IconButton>
        </div>
        <List className={classes.root} {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => {
              return (
                <ListItem
                  key={`${item.title}-${index}`}
                  className={
                    index === highlightedIndex
                      ? classes.highlighted
                      : undefined
                  }
                  {...getItemProps({
                    item,
                    index,
                  })}
                >
                  <ListItemText
                    primary={item.title}
                    secondary={item.presenter}
                  />
                </ListItem>
              )
            })}
        </List>
      </div>
    )
  }
  return <DropdownCombobox />
};

// export const VideoPicker = () => {
  
//   function DropdownCombobox() {
    
//     const [inputItems, setInputItems] = useState(items)
    
//     const {
//       isOpen,
//       getToggleButtonProps,
//       getLabelProps,
//       getMenuProps,
//       getInputProps,
//       getComboboxProps,
//       highlightedIndex,
//       getItemProps,
//     } = useCombobox({
//       items: inputItems,
//       onInputValueChange: ({ inputValue }) => {
//         setInputItems(
//           items.filter(item =>
//             item.title.toLowerCase().startsWith(inputValue.toLowerCase()),
//           ),
//         )
//       },
//     });

//     return (
//       <div>
//         <label {...getLabelProps()}>Find video by title</label>
//         <div {...getComboboxProps()}>
//           <input {...getInputProps()} />
//           <button {...getToggleButtonProps()} aria-label="toggle menu">
//             &#8595;
//           </button>
//         </div>
//         <ul {...getMenuProps()}>
//           {isOpen &&
//             inputItems.map((item, index) => (
//               <li
//                 style={
//                   highlightedIndex === index
//                     ? { backgroundColor: '#bde4ff' }
//                     : {}
//                 }
//                 key={`${item.id}`}
//                 {...getItemProps({ item: item.title, index })}
//               >
//                 {item.title}
//               </li>
//             ))}
//         </ul>
//       </div>
//     )
//   }
//   return <DropdownCombobox />
// };

// export const VideoPicker = () => {
//   return (
//     <div>
//       <Downshift>
//         {({getLabelProps, getInputProps, isOpen})=>(
//           <div>
//             <label {...getLabelProps()}>Find video by title</label>
//             <input {...getInputProps()} />
//             <ul>
//               {isOpen ? videos.map(video => <li key={video.id}>{video.title}</li>) : null}
//             </ul>
//           </div>
//         )}
//       </Downshift>
//     </div>
//   );
// } 