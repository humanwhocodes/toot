/**
 * @fileoverview A CLI for tooting out updates.
 * @author Nicholas C. Zakas
 */

/* eslint-disable no-console */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { toot } from "./toot.js";
import * as dotenv from "dotenv";

//-----------------------------------------------------------------------------
// Setup
//-----------------------------------------------------------------------------

if (process.argv.length < 3) {
    console.error("Usage: toot \"Message to toot.\"");
    console.error("Missing message to toot.");
    process.exit(1);
}

if (process.env.TOOT_DOTENV === "1") {
    dotenv.config();
}

/*
 * Command line arguments will escape \n as \\n, which isn't what we want.
 * Remove the extra escapes so newlines can be entered on the command line.
 */
const message = process.argv[2].replace(/\\n/g, "\n");

const environmentVariables = [
    "MASTODON_ACCESS_TOKEN",
    "MASTODON_HOST"
];

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

toot(message, process.env)
    .then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(error => {
        if (error.message) {
            console.error(error.message);
        } else {

            console.dir(error);

            if (Array.isArray(error)) {
                const firstError = error[0];

                if (firstError.code === 215) {
                    console.error(`
This error is likely caused by invalid authentication information. Please check
that you have configured your environment variables with the correct values.
Here are the lengths of the environment variables provided for reference:\n`);

                    for (const environmentVariable of environmentVariables) {
                        console.error(environmentVariable, process.env[environmentVariable].length);
                    }

                }
            }

        }
        process.exit(1);
    });
