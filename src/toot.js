/**
 * @fileoverview Main functionality for tooting.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { Env } from "@humanwhocodes/env";

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function toot(message, options = {}) {

    if (!message) {
        throw new Error("Missing message to toot.");
    }

    const env = new Env(options);

    const {
        MASTODON_ACCESS_TOKEN,
        MASTODON_HOST
    } = env.required;

    const url = `https://${MASTODON_HOST}/api/v1/statuses`;
    const data = new FormData();
    data.append("status", message);

    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${MASTODON_ACCESS_TOKEN}`
        },
        body: data
    }).then(response => response.json());
}
