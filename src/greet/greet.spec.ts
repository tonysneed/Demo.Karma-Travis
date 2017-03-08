import {greet} from "./greet";

describe("greet", function() {
    it("returns Hello World", function(){
        // Arrange
        let name: string = "World";

        // Act
        let result = greet(name);

        // Assert
        expect(result).toEqual("Hello World!");
    });
});