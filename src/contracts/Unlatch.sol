//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Unlatch {
    uint256 public courseCount = 0;
    uint256 public videoCount = 0;

    struct NVideo {
        string name;
        string cid;
    }

    struct Video {
        uint256 id;
        string name;
        string cid;
        address payable author;
    }

    struct Course {
        uint256 id;
        string title;
        string description;
        uint256[] videoIDs;
    }

    mapping(uint256 => Course) public courses;
    mapping(uint256 => Video) public videos;

    //Create a course
    function createCourse(
        string memory _title,
        string memory _description,
        NVideo[] memory _videos
    ) public {
        require(msg.sender != address(0x0));
        require(bytes(_title).length > 0);
        require(bytes(_description).length > 0);
        require(_videos.length > 0);
        courses[courseCount].id = courseCount;
        courses[courseCount].title = _title;
        courses[courseCount].description = _description;
        for(uint256 i = 0; i < _videos.length; i++) {
            require(bytes(_videos[i].name).length > 0);
            require(bytes(_videos[i].cid).length > 0);
            videos[videoCount].id = videoCount;
            videos[videoCount].name = _videos[i].name;
            videos[videoCount].cid = _videos[i].cid;
            videos[videoCount].author = payable(msg.sender);
            courses[courseCount].videoIDs.push(videoCount);
            videoCount++;
        }
        courseCount++;
    }

    //Retrieve a course
    function getCourse(uint256 _id) public view returns (Course memory) {
        require(msg.sender != address(0x0));
        require(_id > 0);
        require(_id <= courseCount);
        return courses[_id];
    }

    //Retrieve 10 latest courses
    function getLatestCourses() public view returns (Course[] memory) {
        require(msg.sender != address(0x0));
        Course[] memory latestcourses = new Course[](10);
        uint256 i = 0;
        for (uint256 j = courseCount; j > 0; j--) {
            if (i < 10) {
                latestcourses[i] = this.getCourse(j);
                i++;
            } else {
                break;
            }
        }
        return latestcourses;
    }
}