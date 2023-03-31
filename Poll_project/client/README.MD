# Client   
After knowing that this assignment was to create a real-time voting system, I thought about how to extend this topic and add my own ideas into the project. After using the voting tool on the IGN website, two ideas came to mind. One was to enhance the visual effects of the voting tool, possibly through the use of 3D components or animation. The other idea was to create an useful polling management system for managing numerous polls. I really wanted to do both, but based on limited develop time, I chose the latter.    
The polling management system is a system that is tied to identity groups and uses Google Auth for login, using only email, username, and avatar. After logging in, users can see the 20 most recently created polls. Clicking on the "Polls" option allows users to browse all polls and filter them by selecting topic type or entering the search bar. Clicking on "Add a Poll" allows users to enter the poll creation page and set options and the display image. Clicking on any poll option allows users to vote, and the accumulated votes and proportion of votes are displayed in real-time. There is no restriction on one person's ability to vote for the same poll for testing purposes. Additionally, if the vote is created by the user, they can edit or delete it (however, there are still some bugs with editting options). Clicking on "Users" shows all user groups, and clicking on a user card allows users to access the user information page and view all polls created by that user.   
This project is built on the React framework called refine, which provides many convenient hooks and bootstrap, and is more integrated and convenient to develop a MERN app. Therefore, I chose to try using this unfamiliar framework to develop this project.
    
## Getting Started   

1. Clone the repository: `git clone https://github.com/ncuhangzi/Code_Foo_10.git`.
2. Go to the client foldr: `cd Poll_project/client`.   
3. Install dependencies: `npm install`.   

## Usage
1. Start the development server: `npm run dev`.
2. Open the browser and navigate to http://localhost:3000
3. Explore the polling system.

## Configuration   
Please make sure that the root directory contains the `.env` file, which contains `REACT_APP_GOOGLE_CLIENT_ID`   

- Google Cloud OAuth [Docs](https://developers.google.com/identity/protocols/oauth2?hl=en)   
   
## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## License

MIT
