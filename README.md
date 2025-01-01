# Users Library App

The **Users Library App** is a React and TypeScript application built using Next.js. It is designed to manage a library of users fetched from an external API with features like editing, deleting, and adding new users. The app is responsive, well-designed, and adheres to best practices for clean and modular code.

---

## Features

### Core Features
1. **User Listing**:
   - Fetches user data from the [Random User API](https://randomuser.me/api/?results=10).
   - Displays name, email, user image, and location.

2. **Edit User**:
   - Opens a modal to edit user details (Name, Email, Location).
   - Includes validation:
     - **Name**: Minimum of 3 characters.
     - **Email**: Valid format and uniqueness.
     - **Fields**: Cannot be empty.

3. **Add User**:
   - Opens a form to add a new user.
   - Validates input as per the rules for editing users.

4. **Delete User**:
   - Deletes a user with a confirmation prompt.

5. **Search Users**:
   - Filters users by name, email, ID, or location.
   - Implements client-side search.

### Bonus Features
1. **React Query**:
   - Manages server state efficiently.
   - Implements caching and background updates.

2. **Responsive Design**:
   - Works seamlessly across devices (desktop, tablet, and mobile).

3. **Clean and Modular Code**:
   - Adheres to DRY (Don’t Repeat Yourself) principles.
   - Separates components, utilities, and types into their respective directories.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **UI Library**: Material-UI/Bootstrap (depending on the implementation)
- **State Management**: React Query

### Backend
- **API**: [Random User API](https://randomuser.me/)

### Styling
- Styled Components/SCSS Modules for modular and reusable styling.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd users-library
