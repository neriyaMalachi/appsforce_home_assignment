export interface ModalAddUserProps {
    handleSave: (newUser: {
      name: { first: string; last: string };
      email: string;
      location: { country: string; city: string };
    }) => void;
    handleCancel: () => void;
  }
  