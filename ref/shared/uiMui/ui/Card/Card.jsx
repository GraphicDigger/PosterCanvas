import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardActions from '@mui/material/CardActions/CardActions';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';

/**
 * Компонент карточки из библиотеки MUI
 */
export const MuiCard = ({
  title,
  subheader,
  content,
  actions,
  elevation = 1,
  variant = 'outlined',
  className,
  sx,
  ...rest
}) => {
  return (
    <Card
      elevation={elevation}
      variant={variant}
      className={className}
      sx={{
        maxWidth: 300,
        ...sx,
      }}
      {...rest}
    >
      {(title || subheader) && (
        <CardHeader
          title={title}
          subheader={subheader}
        />
      )}

      <CardContent>
        <Typography variant="h5" component="div">Card Title</Typography>
        <Typography variant="body2" color="text.secondary">Card content goes here...</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  );
};

MuiCard.propTypes = {
  /** Заголовок карточки */
  title: PropTypes.node,
  /** Подзаголовок карточки */
  subheader: PropTypes.node,
  /** Содержимое карточки */
  content: PropTypes.node,
  /** Действия карточки (кнопки) */
  actions: PropTypes.node,
  /** Высота тени */
  elevation: PropTypes.number,
  /** Вариант отображения карточки */
  variant: PropTypes.oneOf(['outlined', 'elevation']),
  /** Дополнительный CSS класс */
  className: PropTypes.string,
  /** Дополнительные стили через систему стилей MUI */
  sx: PropTypes.object,
};
