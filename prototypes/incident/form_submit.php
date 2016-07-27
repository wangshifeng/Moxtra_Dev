<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Incident Center</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <!-- jQuery -->
    <script src="js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/app.js"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Incident Center
                    </a>
                </li>
                <li class="active">
                    <a href="./index.html">Create Incident</a>
                </li>
                <li>
                    <a href="./collab.html">Collaboration</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->
        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <h1>Confirm Incident</h1>
                <hr>
                    <div class="row">
                        <div class="col-lg-3">
                            <h4>Incident Information</h4>
                        </div>
                        <div class="col-lg-9">
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Incident ID</label>
                                <p class="" id="incidentId"><?php echo $_POST["incidentId"]; ?></p>
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Incident Name</label>
                                <p class="" id="incidentName"><?php echo $_POST["incidentName"]; ?></p>
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput2">Description</label>
                                <p class="" id="incidentDescription"><?php echo $_POST["incidentDescription"]; ?></p>
                            </fieldset>
                            <div class="row">
                                <div class="col-lg-6">
                                    <fieldset class="form-group">
                                        <label for="formGroupExampleInput2">Date</label>
                                        <p class="" id="incidentDate"><?php echo $_POST["incidentDate"]; ?></p>
                                    </fieldset>
                                </div>
                                <div class="col-lg-6">
                                    <fieldset class="form-group">
                                        <label for="formGroupExampleInput2">Time</label>
                                        <p class="" id="incidentTime"><?php echo $_POST["incidentTime"]; ?></p>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-lg-3">
                            <h4>Classification</h4>
                        </div>
                        <div class="col-lg-9">
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Urgency</label>
                                <p class="" id="classUrgency"><?php echo $_POST["classUrgency"]; ?></p>
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput2">Category</label>
                                <p class="" id="classCategory"><?php echo $_POST["classCategory"]; ?></p>
                            </fieldset>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-lg-3">
                            <h4>Collaboration</h4>
                        </div>
                        <div class="col-lg-9">
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Invite Participants</label>
                                <p class="" id="check911"><?php echo $_POST["check911"]; ?></p>
                                <p class="" id="checkFire"><?php echo $_POST["checkFire"]; ?></p>
                                <p class="" id="checkPolice"><?php echo $_POST["checkPolice"]; ?></p>
                                <p class="" id="checkSWAT"><?php echo $_POST["checkSWAT"]; ?></p>
                            </fieldset>
                        </div>
                    </div>
                <hr>
                <button type="button" class="btn btn-primary" id="startCollabBtn">Start Collaboration</button>

            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    <!-- Menu Toggle Script -->
    <script>
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#startCollabBtn").click(function(){
    	//create binder
    	var dataString = {
                name: <?php echo json_encode($_POST["classCategory"].":".$_POST["incidentName"]); ?>
            };
            console.log(dataString)
        var createBinder = $.ajax({
            'type': 'POST',
            'data': JSON.stringify(dataString),
            'dataType': 'json',
            'contentType': 'application/json',
            'url': mxenv.baseUrl+"me/binders?access_token="+localStorage.getItem("token"),
            'success': function(data) {
            	console.log(data);
            	window.location.href = './collab.html?binderId='+data.data.id;
            },
            'error': function(data) {
                console.log(data);
            },
            'async': false
        });
    })
    </script>
</body>

</html>
