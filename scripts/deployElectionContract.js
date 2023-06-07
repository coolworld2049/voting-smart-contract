const hre = require("hardhat");
const mainContractAddress = require("../deployments/buildbear/MainContract.json").address;

async function main() {
  const maincontract = await hre.ethers.getContractAt("MainContract", mainContractAddress);
  const firstElection = [
    ["student group leader election", "so it is necessary"],
    ["Aboba", "Booba", "Uvuvwevwevwe onyetenvewve ugwemubwem ossas"]
  ]
  const newElectionTransaction = await maincontract.createElection(firstElection[0], firstElection[1]);
  const events = (await newElectionTransaction.wait()).events;
  console.log("Election created");
  console.log(events[0].args);
  const id = String(events[0].args[0]);
  const electionAddress = await maincontract.Elections(id);

  await run(`verify:verify`, {
    address: electionAddress,
    constructorArguments: [
      firstElection[0], firstElection[1]
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
