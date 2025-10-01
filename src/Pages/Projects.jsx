import React from 'react';
import Project from './Project';
import { Routes, Route } from "react-router-dom";

const Projects = () => {
    return (
        <Routes>
            <Route path=":topicId/:projectId" element={<Project />} />
            <Route path=":topicId" element={<Project />} />
        </Routes>
    );
};

export default Projects;
