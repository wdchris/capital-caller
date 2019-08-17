# 5. typescript for typing

Date: 17/08/2019

## Status

Accepted

## Context

Typing of javascript code enables the codebase to more manageable and changes easier to detect and proliforate. Typing in react allows us to explicitly define props on components.

typescript is a superset of javascript which allows OO style syntax to be used.

## Decision

typescript will be used where possible for javascript

## Consequences

We need to get the type specs for libraries if possible.

We should try not to use OO where possible and favour functional paradigms. Typescript should predominantly be used for type checking.

Writing react will be slower in the short term whilst adding type definitions.
