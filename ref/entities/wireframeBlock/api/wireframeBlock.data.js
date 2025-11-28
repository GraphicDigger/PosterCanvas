import { ENTITY_KINDS } from '../../../shared/constants';

export const wireframeBlocks = [
  {
    id: 'wireframe-block-01',
    name: 'Subscribe Form',
    kind: ENTITY_KINDS.WIREFRAME_BLOCK,
    targetId: 'element-01-form',
    targetType: ENTITY_KINDS.ELEMENT,
    detail: {
      id: 'comment-form-01',
      author: 'Developer',
      text: 'The form should include a logo, navigation menu, and login/signup button. Make sure it stays fixed at the top when scrolling and collapses into a hamburger menu on mobile devices.',
      timestamp: '2023-10-15T10:30:00Z',
    },
  },
  {
    id: 'wireframe-block-02',
    name: 'Product List',
    kind: ENTITY_KINDS.WIREFRAME_BLOCK,
    targetId: 'cards-layout-instance-01',
    targetType: ENTITY_KINDS.INSTANCE,
    detail: {
      id: 'comment-product-list-01',
      author: 'Marketing',
      text: 'The hero section should feature a compelling headline, a brief value proposition, and a strong call-to-action button. Consider using a background image or gradient that aligns with our brand colors.',
      timestamp: '2023-10-15T11:20:00Z',
    },
  },
  {
    id: 'wireframe-block-03',
    name: 'Button',
    kind: ENTITY_KINDS.WIREFRAME_BLOCK,
    targetId: 'button-instance-01',
    targetType: ENTITY_KINDS.INSTANCE,
    detail: {
      id: 'comment-footer-01',
      author: 'Developer',
      text: 'The footer should include links to main site sections, contact information, newsletter signup form, and social media links. Also, don\'t forget to add links to privacy policy, terms of use, and cookie policy to comply with GDPR requirements.',
      timestamp: '2023-10-15T12:10:00Z',
    },
  },
  {
    id: 'wireframe-block-04',
    name: 'CTA',
    kind: ENTITY_KINDS.WIREFRAME_BLOCK,
    targetId: 'instance-01',
    targetType: ENTITY_KINDS.INSTANCE,
    detail: {
      id: 'comment-cta-01',
      author: 'UX Specialist',
      text: 'The CTA button should be prominent and use action-oriented text like "Get Started", "Sign Up", or "Learn More". Use the primary brand color and add hover effects for better user feedback. Consider increasing the button size by 10-15% from standard buttons.',
      timestamp: '2023-10-15T14:05:00Z',
    },
  },
];
