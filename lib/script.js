import angular from 'angular';

var app = angular.module('myApplication', []);

app.controller('myController', ['$scope', '$http', function($scope, $http, $filter) {

  $scope.Username = "";
  $scope.Password = "";

  $scope.logInPage = true;
  $scope.buildingDirectory = false;
  $scope.buildingPage = false;
  $scope.projectForm = false;
  $scope.addNewProject = false;
  $scope.updateProject = false;
  $scope.addComment = false;


  //scopes for the user type and access
  $scope.managerAccess = false;
  $scope.nonManagerAccess = false;

  $scope.filteredBuilding = 123;
  $scope.contractorName = "cccc";
  $scope.ownerName = "aaaa";



  //--------------------------------------------------------------------------//



  //Get the list of users to validate login
  $scope.target = 'https://happybuildings.sim.vuw.ac.nz/api/beattijaco/user_list.json';

  $http.get($scope.target)
    .then(function success(response) {
        $scope.userList = response.data.users;
    })

    //Get the buildings for building directory
  $scope.target2 = 'https://happybuildings.sim.vuw.ac.nz/api/weavercale/building_dir.json';

  $http.get($scope.target2)
    .then(function success2(response) {
      $scope.buildingDir = response.data.buildings;
    })

  //Post a project
  var projectPost = "https://happybuildings.sim.vuw.ac.nz/api/beattijaco/update.project.json";
  
  //Post a building
  var buildingPost = "https://happybuildings.sim.vuw.ac.nz/api/weavercale/update.building.json";

  
  //Get the projects and add to a list
  $scope.projectList = [];
  length = 20;

  for (var i = 0; i < length; i++) {
    var projectGet = "https://happybuildings.sim.vuw.ac.nz/api/beattijaco/project." + i + ".json";

    $http.get(projectGet).then(
      function success(project) {
        $scope.projectList.push(project.data);
      }
    );
  }  



  //--------------------------------------------------------------------------//

  $scope.showContractorPage = function() {
     $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = true;
    $scope.addNewBuilding = false;
  }



  //Functions
  $scope.showBuildingDirectory = function() {
    $scope.logInPage = false;
    $scope.buildingDirectory = true;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;

  }

  $scope.showBuildingInformation = function(x) {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = true;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;


    $scope.filteredBuilding = x.ID;
    $scope.targetBuilding = x;
  }

  $scope.showProjectForm = function(x) {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.addNewProject = false;
    $scope.projectForm = true;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;

    $scope.targetProject = x;
  }

  $scope.updateTheProject = function() {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.addNewProject = false;
    $scope.projectForm = false;
    $scope.updateProject = true;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;
  }

  $scope.logOut = function() {
    $scope.logInPage = true;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;

    $scope.Username = "";
    $scope.Password = "";
    $scope.feedback = "";
  }

  $scope.createProject = function() {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = true;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;
  }

  $scope.createBuilding = function() {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = false;
    $scope.contractorPage = false;
    $scope.addNewBuilding = true;
  }

  $scope.addAComment = function() {
    $scope.logInPage = false;
    $scope.buildingDirectory = false;
    $scope.buildingPage = false;
    $scope.projectForm = false;
    $scope.addNewProject = false;
    $scope.updateProject = false;
    $scope.addComment = true;
    $scope.contractorPage = false;
    $scope.addNewBuilding = false;
  }

  //Add a building
  $scope.addBuilding = function() {
    var building = {
      "ID":$scope.ID,
      "Owner":$scope.Owner,
      "Address":$scope.Address,
      "BuildingType":$scope.BuildingType,
      "ConstructionDate":$scope.ConstructionDate
    };

    $http.post(buildingPost, building).then(
      function success() {
        //scope.buildingDir.push(building);
        alert("Building Added");
      },
      function error() {
        alert("Error: Couldn't post to server"); // Unsuccessful
      }
    );
  }

  //Add a project to the project list
  $scope.addProject = function() {
     var project = {
        "ProjectID":$scope.ProjectID,
        "Name": $scope.Name,
        "BuildingID": $scope.BuildingID,
        "Status": $scope.Status,
        "StartDate": $scope.StartDate,
        "EndDate":$scope.EndDate,
        "ContactPerson":$scope.ContactPerson,
        "ProjectManager":$scope.ProjectManager,
        "Contractor":$scope.Contractor
      };
      //  $http.post call, uses the URL from before.
      $http.post(projectPost, project).then(
        function success() {
          $scope.projectList.push(project);
          alert("Project Successfully Posted"); // Successful post

        }, function error() {
          alert("Error: Couldn't post to server"); // Unsuccessful
        }
      );
  }

  //Delete a project from project list (only manager)
  $scope.deleteProject = function(proj, index) {
    $http.delete("https://happybuildings.sim.vuw.ac.nz/api/beattijaco/delete.project." + proj.ProjectID + ".json").then(function success() {
      $scope.projectList.splice(index, 1);
    });
  }

  //Add a project to the project list
  $scope.editProject = function() {
    var project = {
      "ProjectID":$scope.ProjectIDUpdate,
      "Name":$scope.NameUpdate,
      "BuildingID":$scope.BuildingIDUpdate,
      "Status":$scope.StatusUpdate,
      "StartDate":$scope.StartDateUpdate,
      "EndDate":$scope.EndDateUpdate,
      "ContactPerson":$scope.ContactPersonUpdate,
      "ProjectManager":$scope.ProjectManagerUpdate,
      "Contractor":$scope.ContractorUpdate
    };

    $http.post(projectPost, project).then(
      function success() {
        alert("Project Updated");
        $scope.targetProject = project;
      },
      function error() {
          alert("Error: Couldn't post to server"); // Unsuccessful
        }
    );
  }

  $scope.addCommentSubmit = function() {
    var comment = {
      "Author":$scope.Author,
      "Text":$scope.Text
    };

    $scope.targetProject.Comments.push(comment);
  
    $http.post(projectPost, $scope.targetProject).then(
      function success() {
        alert("Comment Added");
      },
      function error() {
          alert("Error: Couldn't add comment"); // Unsuccessful
        }
    );

    
  }

  //login validation
  $scope.validateForm = function()  {
  var user = $scope.Username;
  var pass = $scope.Password;

  var emptyError = document.getElementById("emptyLogin");
  var emptyError2 = document.getElementById("emptyPassword");
  
  if((user == "" || user == null) && (pass == "" || pass == null)) {
    emptyError.style.display = "block";
    document.getElementById("Username").style.borderBottomColor = "red";
    emptyError2.style.display = "block";
    document.getElementById("Password").style.borderBottomColor = "red";
    $scope.feedback = '';
  }
  else if (user == "" || user == null) {
    emptyError.style.display = "block";
    document.getElementById("Username").style.borderBottomColor = "red";
    emptyError2.style.display = "";
    document.getElementById("Password").style.borderBottomColor = "black";
    $scope.feedback = '';
  }
  else if(pass == "" || pass == null){
    emptyError2.style.display = "block";
    document.getElementById("Password").style.borderBottomColor = "red";
    emptyError.style.display = "";
    document.getElementById("Username").style.borderBottomColor = "black";
    $scope.feedback = '';
  }
  else{
    for (var i = 0; i < $scope.userList.length; i++) {
      if ($scope.userList[i].LoginName == user && $scope.userList[i].Password == pass) {
        if($scope.userList[i].UserType == "manager"){ //Makes sure users that aren't the manager dont have access to features the manager has
          $scope.managerAccess = true;
          $scope.nonManagerAccess = false;

          $scope.contractorAccess = false;
          $scope.nonContractorAccess = true;

          $scope.nonOwnerView = true;
          $scope.ownerView = false;


          $scope.logInPage = false;
          $scope.buildingDirectory = true;
          $scope.buildingPage = false;
          $scope.projectForm = false;
        }
        else if ($scope.userList[i].UserType == "contractor") {
          $scope.nonManagerAccess = true;
          $scope.managerAccess = false;

          $scope.contractorAccess = true;
          $scope.nonContractorAccess = false;

          $scope.nonOwnerView = true;
          $scope.ownerView = false;

          $scope.showContractorPage();
        }
        else { //If its not the manager then show basic functionality
          $scope.nonManagerAccess = true;
          $scope.managerAccess = false;

          $scope.contractorAccess = false;
          $scope.nonContractorAccess = true;

          $scope.nonOwnerView = false;
          $scope.ownerView = true;

          $scope.logInPage = false;
          $scope.buildingDirectory = true;
          $scope.buildingPage = false;
          $scope.projectForm = false;
        }
        
        emptyError.style.display = "";
        emptyError2.style.display = "";
        document.getElementById("Username").style.borderBottomColor = "black";
        document.getElementById("Password").style.borderBottomColor = "black";
      }
      else {
        $scope.feedback = 'Incorrect username and or password';
        emptyError.style.display = "";
        emptyError2.style.display = "";
        document.getElementById("Username").style.borderBottomColor = "black";
        document.getElementById("Password").style.borderBottomColor = "black";
      }
    }
  }
}

}]);
 
 // Caps lock check in password form
var caps = document.getElementById("caps");
document.getElementById("Password").addEventListener("keyup", function(event) {
  if (event.getModifierState("CapsLock")) {
    caps.style.display = "block";
  } else {
    caps.style.display = "none"
  }
});
