Hello team!

This project is a simple, yet functional Grocery List application. It provides an easy-to-use interface to add, delete, and edit groceries. It features server-side persistence, so that the added contacts are not lost when the application is reloaded.

This application uses Server-Side Rendering (SSR) to fetch and pre-populate data on the server before the page is sent to the client. This approach allows for better performance and SEO compared to client-side rendering

Grocery list items are stored with essential details such as Done status, Name, Load and Category. The application includes field validation to ensure data integrity.

I chose to use TypeScript for this Grocery List project because it adds a certain sense of trust and dependability to it. By ensuring that the grocery items, requests, and responses stick to their defined data structures and types, TypeScript shields us from potential bugs that could crop up due to mismatched or inconsistent data types. 

Additionally, I installed and configured Jest, along with all necessary environment libraries. I have written a simple test suite for the GroceryDetails component as an example.

When users launch the application, they see the Grocery List view. It presents users with a list of all their saved groceries. Each grocery is displayed with relevant details. Users can interact with this view to add new grocery list items, delete or edit existing ones, change sort of list.


The design is minimalistic and fully responsive.


What could be improved:

- write tests to cover all components;
- add proper database instead JSON file;
- allow users to categorize their groceries into custom group, making it easier to manage and navigate through large numbers of groceries;
- add error handling in the frontend;
- add search functionality


## Getting Started

To set up this project, please follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using yarn install.
3. Launch the development server using yarn start.

To run tests: yarn test

Thank you for testing and I really hope you will enjoy.

Have a great rest of the day!