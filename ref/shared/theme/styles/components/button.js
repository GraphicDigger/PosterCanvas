import { ref } from '../_ref';
import { sysLight, sysDark } from '../_sys';

const disabled = {
  light: {
    background: ref.color.grey80,
    text: ref.color.grey40,
    icon: ref.color.grey40,
  },
  dark: {
    background: ref.color.white5,
    text: ref.color.grey40,
    icon: ref.color.grey40,
  },
};

export const button = {
  light: {
    default: {
      filled: {
        default: {
          background: sysLight.color.surfaceContainer.default,
          text: sysLight.color.onSurfaceVariant,
          icon: sysLight.color.onSurfaceVariant,
        },
        hover: {
          background: sysLight.color.surfaceContainer.high,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        selected: {
          background: sysLight.color.surfaceContainer.default,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        disabled: {
          ...disabled.light,
        },
      },
      lite: {
        default: {
          background: sysLight.color.surfaceContainer.default,
          text: sysLight.color.onSurfaceVariant,
          icon: sysLight.color.onSurfaceVariant,
        },
        hover: {
          background: sysLight.color.surfaceContainer.high,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        selected: {
          background: sysLight.color.surfaceContainer.high,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        disabled: {
          ...disabled.light,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: sysLight.color.onSurfaceVariant,
          icon: sysLight.color.onSurfaceVariant,
        },
        hover: {
          background: sysLight.color.surfaceContainer.high,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        selected: {
          background: sysLight.color.surfaceContainer.high,
          text: sysLight.color.onSurface,
          icon: sysLight.color.onSurface,
        },
        disabled: {
          ...disabled.light,
        },
      },
    },
    primary: {
      filled: {
        default: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        hover: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        selected: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        disabled: {
          ...disabled.light,
        },
      },
      lite: {
        default: {
          background: sysLight.color.primaryContainer,
          text: sysLight.color.onPrimaryContainer,
          icon: sysLight.color.onPrimaryContainer,
        },
        hover: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        selected: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        disabled: {
          ...disabled.light,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.blue95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: sysLight.color.primary,
          text: sysLight.color.onPrimary,
          icon: sysLight.color.onPrimary,
        },
        disabled: {
          ...disabled.light,
        },
      },
    },
    success: {
      filled: {
        default: {
          background: sysLight.color.success,
          text: sysLight.color.onSuccess,
          icon: sysLight.color.onSuccess,
        },
        hover: {
          background: sysLight.color.success,
          text: sysLight.color.onSuccess,
          icon: sysLight.color.onSuccess,
        },
        selected: {
          background: sysLight.color.success,
          text: sysLight.color.onSuccess,
          icon: sysLight.color.onSuccess,
        },
        disabled: {
          ...disabled.light,
        },
      },
      lite: {
        default: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
    },
    warning: {
      filled: {
        default: {
          background: sysLight.color.warning,
          text: sysLight.color.onWarning,
          icon: sysLight.color.onWarning,
        },
        hover: {
          background: sysLight.color.warning,
          text: sysLight.color.onWarning,
          icon: sysLight.color.onWarning,
        },
        selected: {
          background: sysLight.color.warning,
          text: sysLight.color.onWarning,
          icon: sysLight.color.onWarning,
        },
        disabled: {
          ...disabled.light,
        },
      },
      lite: {
        default: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
    },
    error: {
      filled: {
        default: {
          background: sysLight.color.error,
          text: sysLight.color.onError,
          icon: sysLight.color.onError,
        },
        hover: {
          background: sysLight.color.error,
          text: sysLight.color.onError,
          icon: sysLight.color.onError,
        },
        selected: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
      lite: {
        default: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.light,
        },
      },
    },
  },

  dark: {
    default: {
      filled: {
        default: {
          background: sysDark.color.surfaceContainer.default,
          text: sysDark.color.onSurfaceVariant,
          icon: sysDark.color.onSurfaceVariant,
        },
        hover: {
          background: sysDark.color.surfaceContainer.high,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        selected: {
          background: sysDark.color.surfaceContainer.high,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      lite: {
        default: {
          background: sysDark.color.surfaceContainer.lowest,
          text: sysDark.color.onSurfaceVariant,
          icon: sysDark.color.onSurfaceVariant,
        },
        hover: {
          background: sysDark.color.surfaceContainer.low,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        selected: {
          background: sysDark.color.surfaceContainer.low,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: sysDark.color.onSurfaceVariant,
          icon: sysDark.color.onSurfaceVariant,
        },
        hover: {
          background: sysDark.color.surfaceContainer.low,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        selected: {
          background: sysDark.color.surfaceContainer.low,
          text: sysDark.color.onSurface,
          icon: sysDark.color.onSurface,
        },
        disabled: {
          ...disabled.dark,
        },
      },
    },
    primary: {
      filled: {
        default: {
          background: sysDark.color.primary,
          text: sysDark.color.onPrimary,
          icon: sysDark.color.onPrimary,
        },
        hover: {
          background: sysDark.color.primary,
          text: sysDark.color.onPrimary,
          icon: sysDark.color.onPrimary,
        },
        selected: {
          background: sysDark.color.primary,
          text: sysDark.color.onPrimary,
          icon: sysDark.color.onPrimary,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      lite: {
        default: {
          background: sysDark.color.surfaceContainer.lowest,
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        hover: {
          background: sysDark.color.primaryContainer,
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        selected: {
          background: sysDark.color.primaryContainer,
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        hover: {
          background: ref.color.blue95,
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        selected: {
          background: ref.color.blue95,
          text: sysDark.color.onPrimaryContainer,
          icon: sysDark.color.onPrimaryContainer,
        },
        disabled: {
          ...disabled,
        },
      },
    },
    success: {
      filled: {
        default: {
          background: sysLight.color.success,
          text: sysLight.color.onSuccess,
          icon: sysLight.color.onSuccess,
        },
        hover: {
          background: ref.palette.success50,
          text: ref.color.white100,
          icon: ref.color.white100,
        },
        selected: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled,
        },
      },
      lite: {
        default: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.mint95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
    },
    warning: {
      filled: {
        default: {
          background: sysLight.color.warning,
          text: sysLight.color.onWarning,
          icon: sysLight.color.onWarning,
        },
        hover: {
          background: sysLight.color.warning,
          text: sysLight.color.onWarning,
          icon: sysLight.color.onWarning,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      lite: {
        default: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
    },
    error: {
      filled: {
        default: {
          background: sysLight.color.error,
          text: sysLight.color.onError,
          icon: sysLight.color.onError,
        },
        hover: {
          background: sysLight.color.error,
          text: sysLight.color.onError,
          icon: sysLight.color.onError,
        },
        selected: {
          background: ref.color.orange95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      lite: {
        default: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
      blank: {
        default: {
          background: 'transparent',
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        hover: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        selected: {
          background: ref.color.red95,
          text: ref.color.grey20,
          icon: ref.color.grey20,
        },
        disabled: {
          ...disabled.dark,
        },
      },
    },
  },
};
