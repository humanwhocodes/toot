/**
 * @fileoverview Tests for the CLI.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { execSync } from "child_process";
import { expect } from "chai";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const command = "node src/bin.js";

const envKeys = [
    "MASTODON_ACCESS_TOKEN",
    "MASTODON_HOST"
];

function exec(command, env) {
    return execSync(command, {
        env: {
            ...process.env,
            ...env
        },
        stdio: ["ignore", "pipe", "pipe"]
    });
}


//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("bin", () => {
    describe("Errors", () => {

        it("should error when environment variables are missing", () => {

            expect(() => {
                exec(`${command} "hi"`);
            }).to.throw(new RegExp(envKeys[0]));

        });

        it("should error when only one environment variable is present", () => {

            expect(() => {
                exec(`${command} "hi"`, { [envKeys[0]]: "foo" });
            }).to.throw(new RegExp(envKeys[1]));

        });

        it("should error when there is no message to toot", () => {

            expect(() => {
                exec(command, {
                    [envKeys[0]]: "foo",
                    [envKeys[1]]: "bar",
                });
            }).to.throw(/Missing message to toot/);

        });

    });

});
