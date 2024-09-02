import path from 'path';
import { promises as fs } from 'fs';

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

/**
 * Generates a timestamp-based file name.
 * 
 * @param {string} [filename='result'] - The base name for the file.
 * @param {string} [extension='json'] - The file extension.
 * @returns {string} - The generated file name.
 */
export function generateTimestampFileName(filename: string = 'result', extension: string = 'json'): string {
    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    const timestamp = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
    return `${filename}-${timestamp}.${extension}`;
}