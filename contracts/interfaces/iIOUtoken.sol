pragma solidity ^0.5.0;

interface  iIOUtoken  {

    struct DescriptionIOU {
        uint256 totalMinted;
        uint256 totalBurned;
        int256 avRate;
        bytes32 units;        
        address issuer;
        string myName ; //name of emitter
        string socialProfile ; //profile  of emitter in social nets
        string description ; //description of bond IOU to  work
        string location; //where is it             
        bytes32[] keywords;
    }


    struct FeedBack {
        address sender;
        uint256 time;
        int256 rating; // estimation of skills in 255 grades
        string text; //comment
    }


}