/**
 * Base interface for crud repositories
 */
export interface CrudRepository<T extends Id> {

    /**
     * Gets a single object from the database
     * @param id - the id of the object to retrieve
     */
    get(id: string): Promise<T>;

    /**
     * Saves a single object into the database
     * @param object - the object to save
     */
    save(object: T): Promise<void>;
}
