# CS50 Quote Bot

##### Created by Anthony Bau, Annie Chen, and Brian Yu at CS50's Hackathon 7/14/16

This bot maintains a quote list that is queried through Slack.

Add a quote via:

```
/quotelist add NAME QUOTE
```

where NAME is the person who said the quote, and QUOTE is the quote.

Find a quote via:

```
/quotelist NAME
```

A random quote in the database by NAME will be returned in Slack. If no quotes match the query, the quote bot will tell you that the person has no quotes.

Prompt a random quote via:

```
/quotelist
```

which returns a random quote.
