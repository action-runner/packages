import * as github from "@actions/github";
import { Comment } from "../interfaces/comment";

interface Props {
  owner: string;
  repo: string;
  pullRequestNumber: number;
  githubToken: string;
  onComment(comment: Comment): boolean;
}

/**
 * Find a comment in the pull request based on the match function
 */
export async function findComment({
  owner,
  repo,
  pullRequestNumber,
  githubToken,
  onComment,
}: Props): Promise<Comment | undefined> {
  const client = github.getOctokit(githubToken);
  for await (const { data: comments } of client.paginate.iterator(
    client.rest.issues.listComments,
    {
      owner: owner,
      repo: repo,
      issue_number: pullRequestNumber,
    }
  )) {
    // Search each page for the comment
    const comment = comments.find((c) => onComment(c as unknown as Comment));
    if (comment) return comment as unknown as Comment;
  }
  return undefined;
}

/**
 * Find a list of comments in the pull request based on the match function
 */
export async function findComments({
  owner,
  repo,
  pullRequestNumber,
  githubToken,
  onComment,
}: Props): Promise<Comment[]> {
  const client = github.getOctokit(githubToken);
  let returnComments: Comment[] = [];

  for await (const { data: comments } of client.paginate.iterator(
    client.rest.issues.listComments,
    {
      owner: owner,
      repo: repo,
      issue_number: pullRequestNumber,
    }
  )) {
    // Search each page for the comment
    const foundComments = comments.filter((c) =>
      onComment(c as unknown as Comment)
    );
    if (foundComments.length > 0) {
      returnComments = returnComments.concat(foundComments);
    }
  }
  return returnComments;
}
