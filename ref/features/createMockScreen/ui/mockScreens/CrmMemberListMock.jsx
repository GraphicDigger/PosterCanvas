import React from 'react';


export const CrmMemberListMock = () => {
  return (
    <>
      Members
    </>
  );
};


// import React from 'react';
// import { SlotBar, LeftSlot, CenterSlot, RightSlot } from '../../../../shared/uiKit/SlotBar';
// import { Button } from '../../../../shared/uiKit/Button';
// import { PlusIcon } from '../../../../shared/assets/icons';
// import { Text } from '../../../../shared/uiKit/Text';
// import avatarImageTwo from '../../../../shared/assets/dummy/avatar.png';
// import avatarImage from '../../../../shared/assets/dummy/avatar_1.jpg';
// import { TableBody, TableRow, TableCell, TableHeader, Table, TableHead } from '../../../../shared/uiKit/Table';
// import { Avatar } from '../../../../shared/uiKit/Avatar';
// import { Stack } from '../../../../shared/uiKit/Stack';
// import { Surface } from '../../../../shared/uiKit/Surface';
// import { useRecordsByModelId } from '../../../../entities/dataRecord';

// export const CrmMemberListMock = () => {

//   const records = useRecordsByModelId('model1');

//   return (

//     <Surface>
//       <Stack align='flex-start' gap={4}>
//         <SlotBar divider paddingVertical={3} paddingHorizontal={4}>
//           <LeftSlot>
//             <Button variant='blank' color="default" size="large">
//               Dashboard
//             </Button>
//             <Button variant='blank' color="default" size="large">
//               Tasks
//             </Button>
//             <Button color="default" size="large">
//               Members
//             </Button>
//           </LeftSlot>
//           <RightSlot>
//             <Button size="large">
//               Create Member
//             </Button>
//           </RightSlot>
//         </SlotBar>

//         <Stack align='flex-start' justify='center' gap={4}>
//           {records.length > 0
//             ?
//             <Table width='90%'>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>
//                     <Text size='medium'>Name</Text>
//                   </TableHead>
//                   <TableHead>
//                     <Text size='medium'>Email</Text>
//                   </TableHead>
//                   <TableHead>
//                     <Text size='medium'>Role</Text>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {records.map((record) => (
//                   <TableRow size='large'>
//                     <TableCell>
//                       <Avatar size='large' src={record.avatar} />
//                       <Text size='medium'>{record.name}</Text>
//                     </TableCell>
//                     <TableCell>
//                       <Text size='medium'>{record.email}</Text>
//                     </TableCell>
//                     <TableCell>
//                       <Text size='medium'>{record.role}</Text>
//                     </TableCell>
//                   </TableRow>
//                 ))}

//               </TableBody>
//             </Table>
//             :
//             <Table width='90%'>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>
//                     <Text size='medium'>Name</Text>
//                   </TableHead>
//                   <TableHead>
//                     <Text size='medium'>Email</Text>
//                   </TableHead>
//                   <TableHead>
//                     <Text size='medium'>Role</Text>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow size='large'>
//                   <TableCell>
//                     <Avatar size='large' />
//                     <Text size='medium'>Name Surname</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>example@gmail.com</Text>
//                   </TableCell>
//                   <TableCell>
//                     <Text size='medium'>Role</Text>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           }
//         </Stack>
//       </Stack >
//     </Surface>
//   );
// };
