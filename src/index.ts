import express, {Request, Response} from 'express';
import config from './config';
import {App} from "./app";

const mongoose = require('mongoose');

const app = new App();
// @ts-ignore
app.start();