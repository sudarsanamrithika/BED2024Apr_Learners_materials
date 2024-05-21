const dbConfig = require("../dbConfig");
const sql = require("mssql");

class User { 
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static async createUser(newUserData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
    
        const request = connection.request();
        request.input("username", newUserData.username);
        request.input("email", newUserData.email);
    
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        // Retrieve the newly created User using its ID
        return this.getUserById(result.recordset[0].id);
      }

    static async searchUsers(searchTerm) {
        const connection = await sql.connect(dbConfig);
    
        try {
          const query = `
            SELECT *
            FROM Users
            WHERE username LIKE '%${searchTerm}%'
              OR email LIKE '%${searchTerm}%'
          `;
    
          const result = await connection.request().query(query);
          return result.recordset;
        } catch (error) {
          throw new Error("Error searching users"); // Or handle error differently
        } finally {
          await connection.close(); // Close connection even on errors
        }
    }

    static async getAllUsers() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = 'SELECT * FROM Users';
        
        const request = connection.request();
        const result = await request.query(sqlQuery);
        connection.clost();

        return result.recordset.map(
            (row) => new User(row.id, row.username, row.email)
        );
    }

    static async getUserById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = 'SELECT * FROM Users WHERE id = @id';

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new User(
            result.recordset[0].id,
            result.recordset[0].username,
            result.recordset[0].email
        )
        : null
    }

    static async createUser(newUserData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
    
        const request = connection.request();
        request.input("username", newUserData.username);
        request.input("email", newUserData.email);
    
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        // Retrieve the newly created User using its ID
        return this.getUserById(result.recordset[0].id);
    }

    static async updateUser(id, newUserData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        request.input("username", newUserData.username || null); // Handle optional fields
        request.input("email", newUserData.email || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getUserById(id); // returning the updated User data
      }
    
      static async deleteUser(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
      }
}
    
module.exports = User;
