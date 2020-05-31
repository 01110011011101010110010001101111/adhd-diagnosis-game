# ADHD Diagnosis Game
We have designed a game which identifies early signs of ADHD in children by tracking the exhibition of common symptoms such as self-focused behavior.

## Inspiration
ADHD is a common mental illness in many children which we've seen throughout our lives. One member drew inspiration from a piano teacher's son who had ADHD but wasn't diagnosed in years. We hope to design a fun and interactive app which allows kids to play games. When they play the games, they are given a "score" for common symptoms of ADHD. Using these games and the scores, obtained through machine learning and statistical procedures, we try to give users an ADHD index.

## Our Solution

### Games: Passive Diagnostics
Most kids are enticed by games, which lead us to create an app to **repurpose games to be a health asset**. <br>
<br>
If we were asked to specifically focus, if we were given the ability to see what we are being tested on and how to do well, then a test often is lacking in certain areas. Games provide a method by which mental illness such as ADHD can be passively diagnosed, allowing the child to engage in the game and work with their natural reflexes while also testing these tendencies.

### Game 1: Song Completion with a Team
For the first game, users are told to listen to a video of a song. Next, with two bots, the bots and user alternates through the lyrics with each player saying one word from the song. If someone messes up the song, all the players must restart. <br>
This challenge attempts to focus on every symptom the user shows. To complete the song, the user has to focus on others, and they must wait their turn. Each song is a sizable length, so the user has to focus and try to finish the task which needs extended mental effort. <br>
To create this, we used UiPath to scrape song lyrics and videos. The game is made with HTML/CSS/JS. To calculate the scores, a timer is used to measure response time. We measured for how different a time measure was from what was expected using a modified percentage of change formula. If it failed to reach the appropriate threshold, then we’d increase the final score using a modified percent of change formula. Finally, the average of all the scores were returned to conclude with a final score.

### Game 2: Distribution of Tasks Amongst Agents
For the second game, users must begin by reading the full set of instructions, as the game is quite difficult to play without context. This passively tests a user’s ability to focus and read the instructions.<br>
Next the user is given a certain number of tokens. These tokens will speed up the agents, and it is the user’s job to distribute them such that as many of the agents are able to reach the other side before time runs out.<br>
This tests a user’s tendency towards self-focused behavior by whether they focused entirely on bringing only a select few to the other side or not.<br>
To create this, we used the HTML5 Canvas to render the agents and their setting - in this case, a swimming pool. The agents were simple unicodes represented as classes which were regularly updated using best practices(requestAnimationFrame as opposed to setInterval). The scores were calculated by simple linear regression, taking each of the swimmers and the number of times they were given a token. We found the slope for the function of the number of times they were given a token and then calculated the score with 1/(slope), which normalized the data into the range [0, 1]. The smaller slope is, the larger the score, and the smaller the distribution between the swimmers and their speeds.<br>
Smaller features were added as well, including a back button to reroute to the past page and a loading icon for when the code was attempting to send a POST request to the database. The POST request utilized XMLHttpRequests and the callback for the request handled several different potential events: given that the user could not access the database, the loading icon would turn red as a warning sign that their progress had not been synced, or the loading icon would go away, representing that the POST request had been successfully submitted, received, and handled appropriately by the backend.


## Symptoms we are checking
At the end of each game, a user will get a score for each of the traits:
 
* Self-focused behavior - In a team needing to work together
* Trouble waiting their turn - Have to watch a tutorial on how to do everything
* Unfinished tasks - Missions that are relatively long
* Lack of focus - Missions that require focus
* Avoidance of tasks needing extended mental effort - Can choose and exit missions that require a lot of effort

## Challenges we ran into
* Deciding the proper structure of our application
* Providing a level of clarity while also working semi-independently
* Working with teammates in different time zones

## Technologies used
* MongoDB - to store user login data and the score of the central five traits
* NodeJS - to create APIs and to connect to the MongoDB database.
* HTML - for Front-End
* CSS - For Front-End styling
* Javascript - For the functioning of games as well as sending, receiving, and processing HTTP requests.
* UiPath - for getting data for song lyrics

## What We Learned
* How to work through different time zones
* How ADHD is diagnosed
* How to score different factors from a game
* Different distribution algorithms and methods

## Next Steps
Next, we hope to better integrate all the games and add more to cover more symptoms of ADHD or expand to other mental disorders common for children. Also, we may incorporate a single big game instead of party-game style. 

