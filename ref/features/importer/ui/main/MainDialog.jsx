import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Button } from '../../../../shared/uiKit/Button';
import { Text } from '../../../../shared/uiKit/Text';
import { Grid } from '../../../../shared/uiKit/Grid';
import { CodeIcon } from '../../../../shared/assets/icons';
import { FigmaIcon } from '../../../../shared/assets/icons';
import { WebScanIcon } from '../../../../shared/assets/icons';
import { CONTENT_TYPES } from '../../../../widgets/projectExplorerSidebar/model';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { TextField, EndSlot } from '../../../../shared/uiKit/Fields';

const DialogButton = ({ children, onClick }) => {
  return (
    <Button color='default' stretch size={150} onClick={onClick}>
      {children}
    </Button>
  );
};

export const MainDialog = ({ setContentType }) => {
  const theme = useTheme();

  return (
    <Stack gap={2} direction='column'>
      <DialogButton onClick={() => setContentType(CONTENT_TYPES.CODEBASE)}>
        <Stack direction='column' justify='center' gap={2}>
          <Button color='default' startIcon={<CodeIcon color={theme.sys.typography.color.primary} />} >
            Codebase
          </Button>
          <Text align='center' color={theme.sys.typography.color.secondary}>HTML CSS JS ・ ReactJS ・ VueJS ・ AngularJS</Text>
        </Stack>
      </DialogButton>
      <Grid container spacing={2} columns={12}>
        <Grid item size={6}>
          <DialogButton onClick={() => setContentType(CONTENT_TYPES.FIGMA)}>
            <Stack direction='column' justify='center' gap={2}>
              <Button color='default' startIcon={<FigmaIcon />} >
                Download Figma Plugin
              </Button>
              <Text align='center' color={theme.sys.typography.color.secondary}>Import Design from Figma</Text>
            </Stack>
          </DialogButton>
        </Grid>
        <Grid item size={6}>
          <DialogButton onClick={() => setContentType(CONTENT_TYPES.WEB_SCAN)}>
            <Stack direction='column' justify='center' gap={2}>
              <Button color='default' startIcon={<WebScanIcon />} >
                Web Scan
              </Button>
              <Text align='center' color={theme.sys.typography.color.secondary}>Upload Screen website: PNG, JPEG</Text>
            </Stack>
          </DialogButton>
        </Grid>
      </Grid>
      <DialogButton>
        <Stack >
          <TextField width={350} placeholder='Enter website URL' >
            <EndSlot>
              <ButtonTool onClick={() => setContentType(CONTENT_TYPES.URL)}>
                <WebScanIcon />
              </ButtonTool>
            </EndSlot>
          </TextField>
        </Stack>
      </DialogButton>
    </Stack>

  );
};

DialogButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
