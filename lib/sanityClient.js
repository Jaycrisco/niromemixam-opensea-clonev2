import sanityClient from "@sanity/client";

export const client = sanityClient ({
    projectId: '836n2ui4',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: false,
})


