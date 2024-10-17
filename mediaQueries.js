let currentMediaQuery = ""; // Variable to store the current media query

function handleMediaQuery(queryName, x) {
  if (x.matches) {
    currentMediaQuery = queryName; // Update the current media query variable with the query name
    console.log("Current media query:", currentMediaQuery);
  } else {
    // Handle the case when the media query doesn't match (optional)
  }
}

const mq1 = window.matchMedia("(min-width: 300px) and (max-width: 700px)");
const mq2 = window.matchMedia("(min-width: 700px) and (max-width: 1200px)");
const mq3 = window.matchMedia("(min-width: 1200px)");

handleMediaQuery("mq1", mq1);
handleMediaQuery("mq2", mq2);
handleMediaQuery("mq3", mq3);

mq1.addListener(() => handleMediaQuery("mq1", mq1));
mq2.addListener(() => handleMediaQuery("mq2", mq2));
mq3.addListener(() => handleMediaQuery("mq3", mq3));
