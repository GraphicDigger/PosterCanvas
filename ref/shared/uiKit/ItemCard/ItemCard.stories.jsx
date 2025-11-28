import React from 'react';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle, CardBody, CardFooter } from './index';


export default {
  title: 'uiKit/ItemCard',
  component: ItemCard,
};

export const Template = () => {

  const handleActionsClick = () => {
    console.log('show card actions');
  };

  return (
    <div style={{ width: '300px' }}>
      <ItemCard onActionsClick={handleActionsClick}>
        <CardAvatar />
        <CardTitle>
                    Message title, Member name, etc.
        </CardTitle>
        <CardSubtitle>
                    Role, Date, etc.
        </CardSubtitle>
        <CardBody>
                    Text of a message, notification, commit, comment, etc.
        </CardBody>
        <CardFooter>
                    Avatars, buttons, etc.
        </CardFooter>
      </ItemCard>
    </div>
  );
};

export const Card = () => {
  return (
    <div style={{ width: '400px' }}>
      <ItemCard border>
        <CardAvatar />
        <CardTitle>
                    Message title, Member name, etc.
        </CardTitle>
        <CardSubtitle>
                    Role, Date, etc.
        </CardSubtitle>
        <CardBody>
                    Text of a message, notification, commit, comment, etc.
        </CardBody>
        <CardFooter>
                    Avatars, buttons, etc.
        </CardFooter>
      </ItemCard>
    </div>
  );
};

