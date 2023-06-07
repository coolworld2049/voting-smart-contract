// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Election {
    //Election details will be stored in these variables
    string public name;
    string public description;
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;     //Storing address of those voters who already voted
    uint public candidatesCount = 0;     //Number of candidates in standing in the election
    
    //Setting of variables and data, during the creation of election contract
    constructor(string[] memory _nda, string[] memory _candidates) public {
        require(_candidates.length > 0, "There should be atleast 1 candidate");
        name = _nda[0];
        description = _nda[1];
        for (uint i = 0; i < _candidates.length; i++) {
            addCandidate(_candidates[i]);
        }
    }
    
    function getElectionDetails() public view returns (string memory, string memory, uint) {
        return (name, description, candidatesCount);
    }
    
    //Private function to add a candidate
    function addCandidate(string memory _name) private {
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
    }
    
    //Public vote function for voting a candidate
    function vote(uint _candidate) public {
        require(!voters[msg.sender], "Voter has already Voted");
        require(
            _candidate < candidatesCount && _candidate >= 0,
            "Invalid candidate to Vote"
        );
        voters[msg.sender] = true;
        candidates[_candidate].voteCount++;
    }
    
    function getVoterStatus(address _voter) public view returns (string memory) {
        require(_voter != address(0), "Invalid voter address");
        if (voters[_voter]) {
            return "Voter has already voted";
        } else {
            return "Voter has not voted yet";
        }
    }
    
    function getCandidate(uint _candidateId) public view returns (uint, string memory, uint) {
        require(_candidateId < candidatesCount && _candidateId >= 0, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
    
    function getWinner() public view returns (uint, string memory, uint) {
        require(candidatesCount > 0, "No candidates available");
        uint maxVotes = 0;
        uint winnerId;
        for (uint i = 0; i < candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = candidates[i].id;
            }
        }
        Candidate memory winner = candidates[winnerId];
        return (winner.id, winner.name, winner.voteCount);
    }
}
