export const calculateObserverAverageVotes = votes => {
  let userVote = 0;
  votes.map(vote => {
    console.log(vote);
    userVote += vote.vote;
  });

  console.log('userVote', userVote);
  const averageVote = (userVote / votes.length).toFixed(1);
  console.log('averageVote', averageVote);

  return {averageVote: averageVote, totalVote: votes.length};

  // console.log(observerVote.filter((vote)=>vote.observerEmail===observers.))
};
