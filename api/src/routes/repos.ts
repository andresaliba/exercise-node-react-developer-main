import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import localAPI from '../../data/repos.json';
import fetch from 'node-fetch';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  // res.header('Cache-Control', 'no-store');
  res.header('access-control-allow-origin', '*');
  res.status(200);
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    // URL for API
    const gitURL = 'https://api.github.com/users/silverorange/repos';
    // Fetching data from API
    const gitFetch = await fetch(gitURL);
    const gitData = await gitFetch.json();
    // combining JSON data
    const combinedData = gitData.concat(localAPI);
    // get only objects where fork is false
    const filteredData = combinedData.filter((a: Repo) => a.fork === false);
    // sort data by creation date, newest first
    const sortedData = filteredData.sort((a: Repo, b: Repo) => {
      return a.created_at > b.created_at ? -1 : 1;
    });
    // send data to server
    res.send(sortedData);
  } catch (error) {
    console.log(error);
  }
});
