const hre = require("hardhat");
const mainContractAddress = require("../deployments/buildbear/MainContract.json").address;

async function main() {
  const maincontract = await hre.ethers.getContractAt("MainContract", mainContractAddress);
  const firstVoting = [
    ["student group leader Voting", "so it is necessary"],
    [["Aboba", "choose me"], ["Booba", "choose me"], ["Uvuvwevwevwe onyetenvewve ugwemubwem ossas", "choose me"]]
  ]
  const newVotingTransaction = await maincontract.createVoting(firstVoting[0], firstVoting[1]);
  const events = (await newVotingTransaction.wait()).events;
  console.log("Voting created");
  console.log(events[0].args);
  const id = String(events[0].args[0]);
  const VotingAddress = await maincontract.Votings(id);

  await run(`verify:verify`, {
    address: VotingAddress,
    constructorArguments: [
      firstVoting[0], firstVoting[1]
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
