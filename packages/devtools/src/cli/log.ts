import cliColor from 'cli-color'

type Args = {
  text?: string
  tag?: string
  json?: unknown
  type?: 'info' | 'error' | 'warning'
}

export const log = (args: Args) => {
  const blockColor: { [key in 'info' | 'error' | 'warning']: cliColor.Format } = {
    info: cliColor.bgCyan.whiteBright.bold,
    error: cliColor.bgRed.whiteBright.bold,
    warning: cliColor.bgYellow.blackBright.bold
  }

  const textColor: { [key in 'info' | 'error' | 'warning']: cliColor.Format } = {
    info: cliColor.blue,
    error: cliColor.red,
    warning: cliColor.yellow
  }

  if (typeof args === 'string') {
    console.info(textColor.info(args))
  }

  const { tag, json, type = 'info' } = args

  if (tag && json) {
    console.info(blockColor[type](`<<< BEGIN ${tag.toUpperCase()}`))
    console.info(textColor[type](JSON.stringify(json, null, 2)))
    console.info(blockColor[type](`END ${tag.toUpperCase()} >>>`))
  }
}
