import sanityClient from "@sanity/client";

export const client = sanityClient ({
    projectId: '75n3h4qs',
    dataset: 'production',
    apiVersion: '2021-10-21',
    token: 'skYDsHAdjt8QfysI3LmwwzDPcDaqa79QM3Sm3XvTGBXvpQTdcXPU7S8FuF5fsU899yYqwquHilvk3xRuqjOavdWvrCPUaxWakd1YiFkE8xVN1nKt7ZC1ydpU8vS2m6aTGJcwRcUhOFSeFk1L8YmCzrQGi5bw4eyG24xEbALB902mysMNufH0',
    useCdn: false,
})