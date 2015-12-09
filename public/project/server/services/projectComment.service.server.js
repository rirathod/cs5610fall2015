/**
 * Created by riddhirathod on 12/9/15.
 */
"use strict";
module.exports = function(app,model){
    app.post("/api/project/project/:projectId/projectComment", AddCommentForProject);
    app.delete("/api/project/project/:projectId/projectComment/:commentId", DeleteCommentForProject);
    app.get("/api/project/project/:projectId/projectComments", GetCommentsForProject);

    function AddCommentForProject(req, res) {
        model.
            AddComment(req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function DeleteCommentForProject(req, res) {
        model.
            DeleteComment(req.params.projectId, req.params.commentId)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function GetCommentsForProject(req, res){
        model
            .FindProjectComments(req.params.projectId)
            .then(function(projectSubTasks) {
                res.json(projectSubTasks);
            });
    }
};