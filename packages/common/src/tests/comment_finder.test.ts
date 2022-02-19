import * as github from "@actions/github";
import { interfaces, commentFinder } from "..";

jest.mock("@actions/github");

describe("Given a comment finder", () => {
  const mockComment1: interfaces.Comment = {
    id: 0,
    node_id: "",
    url: "",
    html_url: "",
    user: null,
    body: "hello-world",
  };

  const mockComment2: interfaces.Comment = {
    id: 1,
    node_id: "",
    url: "",
    html_url: "",
    user: null,
    body: "hello-world 2",
  };

  test("Should return a comment", async () => {
    const mockAsyncIterator = {
      async *[Symbol.asyncIterator]() {
        const data = {
          data: [mockComment1],
        };

        yield data;
      },
    };
    (github.getOctokit as any).mockReturnValue({
      rest: {
        issues: {
          listComments: jest.fn(),
        },
      },
      paginate: {
        iterator: jest.fn().mockReturnValue(mockAsyncIterator),
      },
    });

    const result = await commentFinder.findComment({
      owner: "",
      repo: "",
      pullRequestNumber: 0,
      githubToken: "",
      onComment: (comment: interfaces.Comment) => {
        return comment.body === mockComment1.body;
      },
    });

    expect(result).toStrictEqual(mockComment1);
  });

  test("Should not return a comment", async () => {
    const mockAsyncIterator = {
      async *[Symbol.asyncIterator]() {
        const data = {
          data: [mockComment1],
        };

        yield data;
      },
    };
    (github.getOctokit as any).mockReturnValue({
      rest: {
        issues: {
          listComments: jest.fn(),
        },
      },
      paginate: {
        iterator: jest.fn().mockReturnValue(mockAsyncIterator),
      },
    });

    const result = await commentFinder.findComment({
      owner: "",
      repo: "",
      pullRequestNumber: 0,
      githubToken: "",
      onComment: (comment: interfaces.Comment) => {
        return false;
      },
    });

    expect(result).toBeUndefined();
  });

  test("Should return a list of comment", async () => {
    const mockAsyncIterator = {
      async *[Symbol.asyncIterator]() {
        const data = {
          data: [mockComment1, mockComment2],
        };

        yield data;
      },
    };
    (github.getOctokit as any).mockReturnValue({
      rest: {
        issues: {
          listComments: jest.fn(),
        },
      },
      paginate: {
        iterator: jest.fn().mockReturnValue(mockAsyncIterator),
      },
    });

    const result = await commentFinder.findComments({
      owner: "",
      repo: "",
      pullRequestNumber: 0,
      githubToken: "",
      onComment: (comment: interfaces.Comment) => {
        return true;
      },
    });

    expect(result.length).toBe(2);
  });

  test("Should return an empty list", async () => {
    const mockAsyncIterator = {
      async *[Symbol.asyncIterator]() {
        const data = {
          data: [mockComment1, mockComment2],
        };

        yield data;
      },
    };
    (github.getOctokit as any).mockReturnValue({
      rest: {
        issues: {
          listComments: jest.fn(),
        },
      },
      paginate: {
        iterator: jest.fn().mockReturnValue(mockAsyncIterator),
      },
    });

    const result = await commentFinder.findComments({
      owner: "",
      repo: "",
      pullRequestNumber: 0,
      githubToken: "",
      onComment: (comment: interfaces.Comment) => {
        return false;
      },
    });

    expect(result.length).toBe(0);
  });
});
