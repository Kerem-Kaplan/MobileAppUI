export const calculateAverageVotes = async (observerVote, observers) => {
  console.log('observerVoteeeeee', observerVote);
  //console.log('observers', observers);

  let allAverageVotes = [];

  observers.map(observer => {
    //console.log(observer);
    const votes = observerVote.filter(
      vote => vote.observerEmail === observer.email,
    );
    console.log('votes', votes);

    let userVote = 0;
    votes.map(vote => {
      console.log(vote);
      userVote += vote.vote;
    });

    console.log('userVote', userVote);
    const averageVote = (userVote / votes.length).toFixed(1);

    console.log('averageVote', averageVote);

    allAverageVotes.push({
      averageVote: averageVote,
      observer: observer.email,
      voteLength: votes.length,
    });
  });

  console.log('allAverageVotes', allAverageVotes);

  return allAverageVotes;

  // console.log(observerVote.filter((vote)=>vote.observerEmail===observers.))
};
