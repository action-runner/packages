export interface PackageJSON{
    name?: string
    version?: string
    description?: string
    main?: string
    scripts?: {
        [key: string]: string
    },
    author?: string
    license?: string
    dependencies?: {
        [key: string]: string
    },
    devDependencies?: {
        [key: string]: string
    },
    peerDependencies?: {
        [key: string]: string
    },
    keywords?: string[],
    workspaces?: string[],
}