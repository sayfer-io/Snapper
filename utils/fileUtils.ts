import { promises as fs } from 'fs';
import path from 'path';

/**
 * Finds all `tsconfig.json` files in the given project path.
 * 
 * @param {string} projectPath - The path to the project directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of paths to `tsconfig.json` files.
 */
export async function findTsConfig(projectPath: string): Promise<string[]> {
    const tsConfigPaths: string[] = [];
    await findTsConfigRecursive(projectPath, tsConfigPaths);
    return tsConfigPaths;
}

/**
 * Recursively searches for `tsconfig.json` files in the given directory.
 * 
 * @param {string} currentPath - The current directory path to search in.
 * @param {string[]} tsConfigPaths - The array to store found `tsconfig.json` file paths.
 * @returns {Promise<void>} - A promise that resolves when the search is complete.
 */
async function findTsConfigRecursive(currentPath: string, tsConfigPaths: string[]): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    let foundTsConfig = false;
    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isFile() && entry.name === 'tsconfig.json') {
            tsConfigPaths.push(fullPath);
            foundTsConfig = true;
            break;
        }
    }

    if (!foundTsConfig) {
        for (const entry of entries) {
            if (entry.isDirectory()) {
                await findTsConfigRecursive(path.join(currentPath, entry.name), tsConfigPaths);
            }
        }
    }
}