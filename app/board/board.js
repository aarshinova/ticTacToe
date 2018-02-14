'use strict';

angular.module('myApp.board', [])
    .component('board', {
        templateUrl: 'board/board.html',
        controller: function ($scope) {
          var self = this;

          $scope.player = 'Player1';

          $scope.nextPlayer = 'Player2';

          $scope.win = false;

          $scope.board = [
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ]
            ];
            self.buttonClick = function buttonClick(cell) {
                if (cell.value=='-'){
                   cell.value = ($scope.player=='Player1') ?  'x': 'o';
                }
                if ($scope.player=='Player1') $scope.player='Player2';
                else $scope.player='Player1';

                $scope.nextPlayer = ($scope.player==='Player1') ? 'Player2' : 'Player1';

                // watch the changes in the board
                if ($scope.win) {
                    $scope.nextPlayer = '';
                    $scope.player==$scope.player + ' won!'
                }
            }

            self.checkDisabled = function checkDisabled(cell) {
                return (cell.value!=='-') || $scope.win;
            }

            self.reset = function reset() {
                $scope.player='Player1';
                $scope.win = false;
                $scope.board = [
                    [ { value: '-' }, { value: '-' }, { value: '-' } ],
                    [ { value: '-' }, { value: '-' }, { value: '-' } ],
                    [ { value: '-' }, { value: '-' }, { value: '-' } ]
                ];
            }

            $scope.$watch('board', function (newValue, oldValue, scope) {
                var board = $scope.board;
                // check rows
                var win = true;
                for (var i=0; i<board.length; i++){
                    win = true;
                    for (var j=0; j<board.length-1; j++){
                        if (board[i][j].value !== board[i][j+1].value || board[i][j].value==='-'){
                            win = false;
                        }
                    }
                    if (win){
                        $scope.win = true;
                        break;
                    }
                }

                //check columns
                for (var i=0; i<board.length; i++){
                    win = true;
                    for (var j=0; j<board.length-1; j++){
                        if (board[j][i].value !== board[j+1][i].value || board[i][j].value==='-'){
                            win = false;
                        }
                    }
                    if (win){
                        $scope.win = true;
                        break;
                    }
                }

                //check diagonals (0,0) (1,1) (2,2)
                if (board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value && board[0][0].value!=='-'){
                    $scope.win = true;
                    return;
                }

                //check diagonals (0,2) (1,1) (2,0)
                if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[0][2].value!=='-'){
                    $scope.win = true;
                    return;
                }

            }, true);
        }
    });

