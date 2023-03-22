/**
 * @fileoverview Tests for the toot() function.
 */
/*global describe, it, xit */

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { toot } from "../src/toot.js";
import { expect } from "chai";
import nock from "nock";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const envKeys = [
    "MASTODON_ACCESS_TOKEN",
    "MASTODON_HOST"
];

const message = "toot!";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("toot", () => {
    describe("Errors", () => {
        
        it("should error when environment variables are missing", (done) => {

            toot(message, {}).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[0]));
            }).then(done);
            
        });
        
        it("should error when only one environment variable is present", (done) => {
            
            toot(message, {
                [envKeys[0]]: "foo",
            }).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[1]));
            }).then(done);
            
        });
        
        it("should error when there is no message to toot", (done) => {
            
            toot(undefined).catch(ex => {
                expect(ex.message).to.match(/Missing message to toot/);
            }).then(done);
            
        });
        
    });

    // https://github.com/nock/nock/issues/2183
    xit("should send a toot when there's a message and environment variables", done => {

        const host = "mystodon.social";

        //     const url = `https://${MASTODON_HOST}/api/v1/statuses`;

        nock(`https://${host}`, {
            reqheaders: {
                Authorization: /Bearer foo"/
            }
        }).post(
            "/api/v1/statuses",
            { status: "toot!"}
        ).reply(200, { result: "Success!" });

        toot("toot!", {
            [envKeys[0]]: "foo",
            [envKeys[1]]: host,
        }).then(response => {
            expect(response.result).to.equal("Success!");
        }).then(done, done);

    });

});
