'use strict';

angular.module('myApp.board', [])
    .component('board', {
        templateUrl: 'board/board.html',
        controller: function ($scope) {
          var self = this;

          $scope.player = 'Player1';

          $scope.nextPlayer = 'Player2';

          $scope.board = [
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ]
            ];
            self.buttonClick = function buttonClick(cell) {
                //window.alert("clicked!");
                if (cell.value=='-'){
                   cell.value = ($scope.player=='Player1') ?  'x': 'o';
                }
                if ($scope.player=='Player1') $scope.player='Player2';
                else $scope.player='Player1';

                $scope.nextPlayer = ($scope.player==='Player1') ? 'Player2' : 'Player1';
            }

            self.checkDisabled = function checkDisabled(cell) {
                return (cell.value!=='-');
            }

            self.reset = function reset() {
                $scope.player='Player1';
                $scope.board = [
                    [ { value: '-' }, { value: '-' }, { value: '-' } ],
                    [ { value: '-' }, { value: '-' }, { value: '-' } ],
                    [ { value: '-' }, { value: '-' }, { value: '-' } ]
                ];
            }

            $scope.$watch('board', function (newValue, oldValue, scope) {
                // watch the changes in the board
               // if (board[0][0]===board[0][1] && board[0][0]==board[0][2])
            }, true);
        }
    });